uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.60;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.64) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 0.62) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	p *= 1.0 + 0.11 * sin(time * 2.60);
	p = rot2(length(p) * 1.20 + time * 0.78) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.y += sin(p.x * 4.91 + time * 3.71) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.05, vec3(0.57, 0.40, 0.52), vec3(0.43, 0.33, 0.35), vec3(1.32, 0.94, 1.27), vec3(0.44, 0.53, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
