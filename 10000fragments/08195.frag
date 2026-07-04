uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.33 + 0.12 * sin(t * 0.42)) + vec2(-0.27, -0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	p.y += sin(p.x * 3.98 + time * 1.15) * 0.37;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p *= 1.0 + 0.11 * sin(time * 3.84);
	p = rot2(p.y * 2.28 + time * 1.01) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.40, 0.27), vec3(0.87, 0.60, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
