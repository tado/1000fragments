uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.39;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.64)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.11 - t * 7.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p.y += sin(p.x * 4.60 + time * 3.80) * 0.16;
	p = rot2(length(p) * -2.97 + time * 0.33) * p;
	p = rot2(time * -1.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.26, vec3(0.58, 0.52, 0.41), vec3(0.30, 0.49, 0.40), vec3(1.19, 1.38, 0.85), vec3(0.89, 0.47, 0.90));
	col = fract(col * 1.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
