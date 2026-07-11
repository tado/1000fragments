uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 10.26 - t * 2.59 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 23.16 - t * 3.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	p.y += sin(p.x * 4.42 + time * 3.93) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.52, 0.75, 0.32) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
