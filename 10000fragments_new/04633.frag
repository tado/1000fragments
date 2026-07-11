uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.74 + 0.16 * sin(t * 1.17)) + vec2(-0.81, -0.08) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.50 * jf)) * 0.92;
        xs += sin(length(p - im) * 214.02 - t * 8.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.03, 0.64) * sin(length(q2) * 5.75 - time * 2.42) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.46 + time * 0.36, vec3(0.49, 0.40, 0.54), vec3(0.49, 0.49, 0.48), vec3(0.80, 0.96, 1.21), vec3(0.67, 0.11, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
