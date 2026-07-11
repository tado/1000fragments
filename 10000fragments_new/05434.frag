uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.28;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.42)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.88 - t * 6.89 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.21 + 0.15 * sin(t * 1.37)) + vec2(-0.61, -0.00) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.73 + time * 0.23, vec3(0.57, 0.56, 0.59), vec3(0.37, 0.34, 0.49), vec3(0.74, 1.20, 0.89), vec3(0.12, 0.04, 0.15));
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 1.03 + time * 11.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
