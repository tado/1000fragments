uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.80 + 0.19 * sin(t * 1.57)) + vec2(-0.29, -0.15) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.97 + time * 0.95) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.55; p = rot2(1.67) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.23, vec3(0.50, 0.58, 0.45), vec3(0.48, 0.35, 0.48), vec3(1.31, 0.97, 0.96), vec3(0.60, 0.25, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
