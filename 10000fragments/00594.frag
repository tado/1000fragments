uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.02) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(2.20) * p; }
	p = fract(p * 1.38) - 0.5;
	p = rot2(1.32) * p;
	p = rot2(time * 0.70) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.97 + time * 0.13);
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
