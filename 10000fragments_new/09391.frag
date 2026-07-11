uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.87 + t * 2.21 + ph) + sin(p.y * 8.13 - t * 4.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	p *= 2.09;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.15, vec3(0.43, 0.46, 0.53), vec3(0.44, 0.47, 0.43), vec3(0.87, 1.12, 0.94), vec3(0.51, 0.38, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
