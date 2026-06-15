uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.39) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.65 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	p *= 1.50;
	p = rot2(time * -0.89) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -3.53 + time * 0.28) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.06, vec3(0.44, 0.54, 0.53), vec3(0.49, 0.38, 0.44), vec3(1.07, 0.92, 1.13), vec3(0.10, 0.30, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
