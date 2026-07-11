uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.42) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 3.01 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	p = rot2(p.y * -1.58 + time * 0.24) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.42 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
