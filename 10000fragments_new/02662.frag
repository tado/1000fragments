uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.65 + 0.39 * sin(t * 1.50)) + vec2(-0.82, -0.23) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 0.84) * p;
	p = rot2(length(p) * -2.00 + time * 1.16) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.02, vec3(0.44, 0.43, 0.53), vec3(0.31, 0.40, 0.35), vec3(1.29, 1.25, 0.71), vec3(0.49, 0.58, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
