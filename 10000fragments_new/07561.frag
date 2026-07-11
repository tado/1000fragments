uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.41 - t * 3.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.70 + 0.31 * sin(t * 0.87)) + vec2(-0.61, -0.04) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 4.73 + time * 3.10) * 0.38;
	{ float fr = length(q1); q1 *= 1.0 + 0.72 * fr * fr; }
	q2 = rot2(length(q2) * 2.04 + time * 1.43) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.85);
	float d = d1 * d2;
	vec3 col = hue(d * 0.94 + time * 0.05);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.41 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
