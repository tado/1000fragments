uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.78 + 0.49 * sin(t * 0.98)) + vec2(-0.23, 0.25) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.45;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.93) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.92) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.59;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.44; q2 = rot2(1.92) * q2; }
	q2 *= 1.84;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.15));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.73 + time * 0.78);
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
