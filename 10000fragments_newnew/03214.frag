uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.13 * cos(sa * 4.0 + t * 1.57 + ph);
    v = sin((sr - petal) * 12.57);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 7.35 + time * 2.21) * 0.38;
	p *= 2.28;
	p = rot2(p.y * -3.80 + time * 0.55) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.33, 0.03), vec3(0.76, 0.97, 0.95), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
