uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.56 + 0.13 * sin(t * 1.04)) + vec2(-0.54, -0.04) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.38; }
	{ float fr = length(p); p *= 1.0 + 0.70 * fr * fr; }
	p = rot2(2.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.18, 1.52, 0.96) + vec3(0.06, 0.26, 0.26);
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.13 + time * 8.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
