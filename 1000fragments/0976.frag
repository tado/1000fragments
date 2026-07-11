uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.74 + t * 3.84 + ph) + sin(p.y * 11.82 - t * 0.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.21, vec3(0.53, 0.44, 0.45), vec3(0.39, 0.36, 0.35), vec3(1.17, 1.26, 1.05), vec3(0.52, 0.29, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
