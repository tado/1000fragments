uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.16 * cos(sa * 3.0 + t * 2.29 + ph);
    v = sin((sr - petal) * 13.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.41) * p * 21.26;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.72, 0.84, 0.91), vec3(0.04, 0.13, 0.02), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
