uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.32 + t * 1.53 + ph) + sin(p.y * 8.36 - t * 3.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = rot2(length(p) * 3.36 + time * 0.68) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.27, vec3(0.42, 0.41, 0.42), vec3(0.46, 0.36, 0.47), vec3(1.20, 1.30, 0.73), vec3(0.64, 0.98, 0.26));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
