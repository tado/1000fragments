uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.21 + t * 1.67 + ph) + sin(p.y * 7.17 - t * 4.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 3.44 + time * 3.83) * 0.28;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.11, vec3(0.47, 0.45, 0.54), vec3(0.45, 0.41, 0.35), vec3(1.00, 1.33, 1.13), vec3(0.99, 0.82, 0.95));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
