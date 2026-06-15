uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.07) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 1.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -1.04) * p;
	p = fract(p * 1.62) - 0.5;
	p = rot2(p.y * -1.21 + time * 0.55) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.28, vec3(0.59, 0.51, 0.44), vec3(0.37, 0.49, 0.31), vec3(0.87, 0.91, 1.36), vec3(0.67, 0.02, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
