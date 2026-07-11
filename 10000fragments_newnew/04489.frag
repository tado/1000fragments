uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.59 + 0.19 * sin(t * 0.55)) + vec2(-0.79, -0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.23 + sr * 14.73 - t * 2.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	p = rot2(length(p) * -3.80 + time * 0.39) * p;
	p *= 1.0 + 0.27 * sin(time * 1.34);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.93;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.26 + time * 0.02, vec3(0.46, 0.51, 0.51), vec3(0.39, 0.46, 0.43), vec3(1.03, 1.39, 1.13), vec3(0.53, 0.99, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
