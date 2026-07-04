uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.63 + 0.34 * sin(t * 0.43)) + vec2(-0.88, -0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 7.29 + time * 2.02) * 0.12;
	p *= 1.0 + 0.39 * sin(time * 4.44);
	p = (floor(p * 28.3) + 0.5) / 28.3;
	p = rot2(p.y * 2.93 + time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.16, vec3(0.56, 0.55, 0.56), vec3(0.44, 0.31, 0.43), vec3(0.75, 1.08, 1.39), vec3(0.14, 0.46, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
