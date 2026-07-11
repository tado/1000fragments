uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.80 + t * 1.96 + ph) + sin(p.y * 16.32 - t * 3.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.24, vec3(0.49, 0.47, 0.57), vec3(0.42, 0.48, 0.36), vec3(0.80, 0.88, 0.81), vec3(0.18, 0.51, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
