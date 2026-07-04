uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.90;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.01)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.82 - t * 6.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.63 + t * 1.34 + ph) + sin(p.y * 11.30 - t * 1.34 + ph)
        + sin((p.x + p.y) * 6.60 + t * 1.34 + ph) + sin(length(p) * 8.90 - t * 1.34 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.77, 0.41) * sin(length(p) * 4.22 - time * 0.95) * 0.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.76 + time * 0.15, vec3(0.60, 0.51, 0.52), vec3(0.48, 0.44, 0.40), vec3(1.25, 1.29, 0.71), vec3(0.46, 0.96, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
