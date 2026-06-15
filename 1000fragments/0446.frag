uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.82 + t * 3.10 + ph) + sin(p.y * 5.72 - t * 2.62 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.31, -0.04) * sin(length(p) * 3.59 - time * 1.51) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.30, vec3(0.53, 0.50, 0.48), vec3(0.43, 0.44, 0.50), vec3(1.10, 1.21, 1.27), vec3(0.36, 0.42, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
