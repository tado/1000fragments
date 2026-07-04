uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.35;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.78)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.31 - t * 7.14 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.45 + t * 2.44 + ph) + sin(p.y * 2.29 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.10 + time * 0.02);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
