uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.06 + t * 2.23 + ph) + sin(p.y * 15.46 - t * 4.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.03, vec3(0.59, 0.52, 0.51), vec3(0.31, 0.43, 0.34), vec3(1.18, 0.91, 1.36), vec3(0.60, 0.56, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
