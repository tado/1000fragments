uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.81;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.73)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.37 - t * 5.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.13 * p.y + time * 1.22); p.y += 0.21 / wf * cos(wf * 3.37 * p.x + time * 1.63); }
	{ p = vec2(atan(p.y, p.x) * 2.96, length(p) * 4.08 - time * 0.21); }
	p += vec2(-0.42, 0.07) * sin(length(p) * 4.49 - time * 2.11) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
