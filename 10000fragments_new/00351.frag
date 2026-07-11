uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 25.41 - t * 3.86 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 17.53 - t * 7.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 2.45 + time * 3.57) * 0.28;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 1.70 * p.y + time * 2.14); p.y += 0.40 / wf * cos(wf * 3.12 * p.x + time * 1.47); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.13, vec3(0.57, 0.49, 0.59), vec3(0.47, 0.41, 0.40), vec3(1.37, 0.94, 0.91), vec3(0.31, 0.57, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
