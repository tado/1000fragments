uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.81) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 2.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.23 * cos(sa * 4 + t * 2.61 + ph);
    v = sin((sr - petal) * 7.65);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.45) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = d1 + d2;
	vec3 col = palette(d * 1.41 + time * 0.16, vec3(0.58, 0.55, 0.41), vec3(0.36, 0.33, 0.45), vec3(1.37, 1.22, 0.76), vec3(0.21, 0.26, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
