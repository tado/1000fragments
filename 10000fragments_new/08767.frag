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
    vec2 zp = p * 8.64;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.55)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.58 - t * 5.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p = rot2(length(p) * -1.37 + time * 0.74) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.02, vec3(0.57, 0.53, 0.42), vec3(0.37, 0.45, 0.37), vec3(1.11, 1.09, 0.73), vec3(0.84, 0.23, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
