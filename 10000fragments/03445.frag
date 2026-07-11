uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.49) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 3.32 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.94, -0.28) * sin(length(p) * 2.69 - time * 0.70) * 0.11;
	p = rot2(time * 0.75) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.13);
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
