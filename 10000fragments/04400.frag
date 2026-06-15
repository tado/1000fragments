uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.23 + sin(p.y * 4.90 + t * 2.23) * 1.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.24) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.09, vec3(0.57, 0.59, 0.56), vec3(0.32, 0.36, 0.33), vec3(1.27, 0.80, 1.00), vec3(0.96, 0.24, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
