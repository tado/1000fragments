uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 11.06 - t * 2.08 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 18.14 - t * 4.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.51 * p.y + time * 2.02); p.y += 0.36 / wf * cos(wf * 3.99 * p.x + time * 0.88); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.09, vec3(0.53, 0.56, 0.56), vec3(0.35, 0.45, 0.42), vec3(0.76, 1.19, 1.00), vec3(0.59, 0.91, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
