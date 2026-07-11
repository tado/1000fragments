uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.48 + 0.18 * sin(t * 0.98)) + vec2(-0.35, 0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.20 * fr * fr; }
	p.y += sin(p.x * 3.10 + time * 2.41) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.11, vec3(0.47, 0.43, 0.60), vec3(0.31, 0.40, 0.45), vec3(1.35, 0.77, 0.90), vec3(0.95, 0.14, 0.77));
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.13 + time * 11.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
