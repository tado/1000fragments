uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.38) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(0.43) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.60, length(p) * 3.81 - time * 0.58); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.89 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
