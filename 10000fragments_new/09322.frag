uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.52 + ph), vnoise2(p * 1.52 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.52 + 1.41 * wq + vec2(1.7, 9.2) + t * 0.68),
                   vnoise2(p * 1.52 + 3.84 * wq + vec2(8.3, 2.8) - t * 0.64));
    v = vnoise2(p * 1.52 + 2.20 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p += vec2(0.33, 0.02) * sin(length(p) * 3.75 - time * 1.10) * 0.33;
	p = rot2(length(p) * 1.91 + time * 0.48) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.75 * p.y + time * 1.24); p.y += 0.33 / wf * cos(wf * 1.76 * p.x + time * 1.75); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.07 + time * 0.28);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
