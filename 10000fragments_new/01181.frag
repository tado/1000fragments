uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.44 + t * 2.76 + ph) + sin(p.y * 13.35 - t * 3.20 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.13 + 0.31 * sin(t * 0.70)) + vec2(-0.35, 0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	p = rot2(time * -0.99) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.56 + time * 0.06, vec3(0.41, 0.45, 0.47), vec3(0.50, 0.50, 0.43), vec3(0.85, 1.27, 1.30), vec3(0.41, 0.05, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
