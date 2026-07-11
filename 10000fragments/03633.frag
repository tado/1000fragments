uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.94 + sin(p.y * 5.89 + t * 2.76) * 2.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.95) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.52) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 3.27;
	p = fract(p * 1.43) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.64 + time * 0.28, vec3(0.48, 0.42, 0.53), vec3(0.40, 0.41, 0.48), vec3(1.19, 0.82, 1.19), vec3(0.11, 0.59, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
