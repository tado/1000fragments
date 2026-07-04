uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.60;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.16)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.30 - t * 5.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.30) * p * 9.09;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.08, 0.14, 0.17), vec3(0.83, 0.82, 0.91), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
