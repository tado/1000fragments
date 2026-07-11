uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.16 + sin(p.y * 4.42 + t * 5.19) * 3.14 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.65 + sr * 20.94 - t * 3.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.76;
	p += vec2(0.45, 0.30) * sin(length(p) * 4.33 - time * 1.52) * 0.36;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.44 + time * 0.07, vec3(0.48, 0.51, 0.54), vec3(0.32, 0.35, 0.35), vec3(1.08, 0.81, 1.21), vec3(0.53, 0.04, 0.52));
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
