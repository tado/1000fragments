uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.24 + ph), vnoise2(p * 3.24 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.24 + 1.89 * wq + vec2(1.7, 9.2) + t * 0.51),
                   vnoise2(p * 3.24 + 3.71 * wq + vec2(8.3, 2.8) - t * 0.51));
    v = vnoise2(p * 3.24 + 1.22 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.74;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.39 * p.y + time * 0.66); p.y += 0.36 / wf * cos(wf * 3.65 * p.x + time * 1.97); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.07, 0.21), vec3(0.94, 0.56, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
