uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.30;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.62 - t * 5.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.58 * p.y + time * 1.95); p.y += 0.28 / wf * cos(wf * 2.27 * p.x + time * 1.59); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.07, vec3(0.46, 0.42, 0.52), vec3(0.44, 0.32, 0.30), vec3(1.14, 0.85, 0.98), vec3(0.86, 0.29, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
