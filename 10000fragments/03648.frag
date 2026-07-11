uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.28) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 1.01 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = rot2(length(p) * -3.85 + time * 0.77) * p;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 4.60 - time * 0.34); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.24, 0.30, 0.20), vec3(0.89, 0.92, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
