uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.19;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.33)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.93 - t * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	p = rot2(1.91) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.24 * p.y + time * 0.83); p.y += 0.28 / wf * cos(wf * 2.59 * p.x + time * 1.89); }
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 3.19 - time * 0.89); }
	p = rot2(length(p) * -2.86 + time * 0.47) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.95));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
