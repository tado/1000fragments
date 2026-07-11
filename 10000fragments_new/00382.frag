uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.72;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.16)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.96 - t * 7.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(1.24) * p; }
	p = (floor(p * 10.5) + 0.5) / 10.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.30 * p.y + time * 0.97); p.y += 0.34 / wf * cos(wf * 2.72 * p.x + time * 1.80); }
	p = rot2(1.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.30 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
