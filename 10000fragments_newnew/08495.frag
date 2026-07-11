uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.67 + t * 0.72 + ph) + sin(p.y * 7.58 - t * 0.72 + ph)
        + sin((p.x + p.y) * 2.16 + t * 0.72 + ph) + sin(length(p) * 12.46 - t * 0.72 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.48 + 0.39 * sin(t * 1.03)) + vec2(-0.33, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	{ q2 = vec2(atan(q2.y, q2.x) * 2.57, length(q2) * 3.90 - time * 0.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.48);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.49 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
