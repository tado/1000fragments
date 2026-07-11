uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 34.49 - t * 1.31 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 36.36 - t * 5.51 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.67 + 0.36 * sin(t * 1.42)) + vec2(-0.72, -0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p.y += sin(p.x * 7.64 + time * 3.04) * 0.39;
	p = rot2(time * 1.33) * p;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 3.18 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.83 + time * 0.05, vec3(0.52, 0.51, 0.47), vec3(0.36, 0.37, 0.31), vec3(0.95, 1.35, 1.38), vec3(0.91, 0.88, 0.16));
	col = mod(col * 1.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
