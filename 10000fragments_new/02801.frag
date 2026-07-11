uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.30 * cos(sa * 8.0 + t * 2.01 + ph);
    v = sin((sr - petal) * 15.21);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.39, -1.00) * sin(length(p) * 2.95 - time * 1.04) * 0.28;
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p.y += sin(p.x * 5.30 + time * 2.24) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.26, vec3(0.50, 0.57, 0.48), vec3(0.42, 0.40, 0.38), vec3(1.15, 1.02, 1.11), vec3(0.99, 0.14, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
