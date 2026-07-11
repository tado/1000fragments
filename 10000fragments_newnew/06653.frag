uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.27 + sin(p.y * 1.75 + t * 3.31) * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.0 + 0.31 * sin(time * 3.76);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.21, vec3(0.42, 0.46, 0.44), vec3(0.48, 0.48, 0.33), vec3(1.17, 1.14, 1.32), vec3(0.99, 0.98, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
