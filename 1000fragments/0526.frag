uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.87 + sin(p.y * 2.69 + t * 1.04) * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.06, vec3(0.57, 0.45, 0.58), vec3(0.42, 0.42, 0.43), vec3(0.87, 1.33, 1.32), vec3(0.74, 0.55, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
