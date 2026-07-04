uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.80 + 0.29 * sin(t * 1.38)) + vec2(-0.52, 0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.27 + t * 0.29) - 0.5) * 2.0;
    v = sin((p.y * 5.27 + zx * 0.66 + t * 2.77) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.10, lr * 2.37 + time * 0.54); }
	q1 = (floor(q1 * 23.4) + 0.5) / 23.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.97);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.16, 0.20), vec3(0.81, 0.77, 0.92), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
