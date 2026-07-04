uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.13 * cos(sa * 3.0 + t * 2.47 + ph);
    v = sin((sr - petal) * 19.24);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.08) * p * 13.11;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.93, 0.81, 0.75), vec3(0.03, 0.06, 0.05), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
